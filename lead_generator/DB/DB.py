from DB.DB import utils

conn = utils.connect_DB()
utils.enable_pgcrypto(conn)
