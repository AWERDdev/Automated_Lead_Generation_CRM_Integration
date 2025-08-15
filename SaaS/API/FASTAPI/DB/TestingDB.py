import psycopg2
from Modules.LeadsConfig import (
    connect_DB, 
    enable_pgcrypto, 
    create_table_leads, 
    insert_lead, 
    search_lead, 
    get_qualified_leads, 
    get_disqualified_leads, 
    update_lead_qualification
)

def setup_database():
    """Initialize the database and create required tables"""
    conn = connect_DB()
    enable_pgcrypto(conn)
    create_table_leads(conn)
    print("Database setup complete")
    return conn

def test_insert_lead(conn):
    """Test inserting a new lead"""
    try:
        # Insert qualified lead
        qualified_id = insert_lead(
            conn, 
            "John Doe", 
            "john@example.com", 
            1234567890, 
            "123 Main St", 
            True
        )
        print(f"Inserted qualified lead with ID: {qualified_id}")
        
        # Insert disqualified lead
        disqualified_id = insert_lead(
            conn, 
            "Jane Smith", 
            "jane@example.com", 
            9876543210, 
            "456 Oak Ave", 
            False
        )
        print(f"Inserted disqualified lead with ID: {disqualified_id}")
        
        return qualified_id, disqualified_id
    except psycopg2.Error as e:
        print(f"Error inserting lead: {e}")
        conn.rollback()
        return None, None

def test_search_lead(conn):
    """Test searching for leads"""
    # Search by email
    print("\nSearching by email: john@example.com")
    results = search_lead(conn, email="john@example.com")
    if results:
        for row in results:
            print(f"Found lead: {row}")
    else:
        print("No leads found with that email")
    
    # Search by name
    print("\nSearching by name: Jane Smith")
    results = search_lead(conn, name="Jane Smith")
    if results:
        for row in results:
            print(f"Found lead: {row}")
    else:
        print("No leads found with that name")
    
    # Search by both
    print("\nSearching by name OR email")
    results = search_lead(conn, email="john@example.com", name="Jane Smith")
    if results:
        print(f"Found {len(results)} leads")
        for row in results:
            print(f"Found lead: {row}")
    else:
        print("No leads found with those criteria")

def test_get_qualified_leads(conn):
    """Test getting all qualified leads"""
    print("\nGetting all qualified leads")
    results = get_qualified_leads(conn)
    if results:
        print(f"Found {len(results)} qualified leads:")
        for row in results:
            print(f"Qualified lead: {row}")
    else:
        print("No qualified leads found")

def test_get_disqualified_leads(conn):
    """Test getting all disqualified leads"""
    print("\nGetting all disqualified leads")
    results = get_disqualified_leads(conn)
    if results:
        print(f"Found {len(results)} disqualified leads:")
        for row in results:
            print(f"Disqualified lead: {row}")
    else:
        print("No disqualified leads found")

def test_update_lead_qualification(conn, lead_id=None):
    """Test updating lead qualification status"""
    if lead_id:
        print(f"\nUpdating lead with ID {lead_id} to disqualified")
        update_lead_qualification(conn, lead_id=lead_id, qualified=False)
        print("Update complete. Searching for the updated lead:")
        
        # Search for the lead to verify update
        results = search_lead(conn, email="john@example.com")
        if results:
            for row in results:
                print(f"Updated lead: {row}")
        else:
            print("Could not find the updated lead")
    
    # Update by email
    print("\nUpdating lead by email")
    update_lead_qualification(conn, email="jane@example.com", qualified=True)
    results = search_lead(conn, email="jane@example.com")
    if results:
        for row in results:
            print(f"Updated lead by email: {row}")
    else:
        print("Could not find the updated lead")

def run_all_tests():
    """Run all test functions"""
    conn = setup_database()
    
    # Insert test data
    qualified_id, disqualified_id = test_insert_lead(conn)
    
    # Run search tests
    test_search_lead(conn)
    
    # Run filter tests
    test_get_qualified_leads(conn)
    test_get_disqualified_leads(conn)
    
    # Run update tests
    if qualified_id:
        test_update_lead_qualification(conn, qualified_id)
    
    # Close connection
    conn.close()
    print("\nAll tests completed")

if __name__ == "__main__":
    run_all_tests()