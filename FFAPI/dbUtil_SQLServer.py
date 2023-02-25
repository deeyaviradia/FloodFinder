import pymssql
import FFutil

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def sql_fetch(con, sql):
    attempts_left = 3
    while attempts_left > 0:
        try:
            cursor_obj = con.cursor()
            cursor_obj.execute(sql)
            return cursor_obj.fetchall()
        except Exception as ex:
            print(ex)
            attempts_left -= 1

    return None


def is_present(con, table_name):
    cursor_obj = con.cursor()
    sql_code = "select top 1 1 from sys.sysobjects where object_id('{0}') is not null".format(table_name)
    cursor_obj.execute(sql_code)
    t = cursor_obj.fetchall()
    if t is not None:
        return True

    return False


def sql_insert(con, table_name, fields, values):
    cursor_obj = con.cursor()
    placeholder = _get_placeholder(values) #("?," * len(values))[:-1]
    sql_code = 'INSERT INTO {0}({1}) VALUES({2})'.format(table_name, fields, placeholder)
    cursor_obj.execute(sql_code, values)
    con.commit()

def _get_placeholder(a):
    s = []
    for i in a:
        if isinstance(i, str):
            s.append("'{0}'".format(i))
        else:
            s.append(str(i))
    return ",".join(s)

def sql_upsert(con, table_name, fields, values):
    cursor_obj = con.cursor()
    key = fields.split(",")[0]
    sql_code = "DELETE FROM {0} WHERE {1} = '{2}'".format(table_name, key, values[0])
    cursor_obj.execute(sql_code)
    try:
        placeholder = _get_placeholder(values)
        sql_code = "INSERT INTO {0}({1}) VALUES({2})".format(table_name, fields, placeholder)
        #print(sql_code)
        cursor_obj.executemany(sql_code, [values])
        con.commit()
    except Exception as ex:
        print(ex)

    FFutil.show_info(sql_fetch(con, "SELECT * FROM imageInfo WHERE {1} = '{2}'".format(table_name, key, values[0])))


def sql_update(con, table_name, updates, key_field):
    cursor_obj = con.cursor()
    sql_code = "UPDATE {0} SET {1} WHERE {2}".format(table_name, updates, key_field)
    cursor_obj.execute(sql_code)
    con.commit()
