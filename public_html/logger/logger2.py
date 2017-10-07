#! /usr/bin/python
import cgi, re, imp, json, time, sys


import cgitb
cgitb.enable(format='plain')

from dataModel import *
import credentials

def abort404(message):
    print 'Status: 404 Not Found %s\n' % message
    exit(-1)

def abort400(message):
    print 'Status: 400 Bad Request %s\n' % message
    exit(-1)

def getQueryArgument(argName, query=cgi.FieldStorage()):
    if not query.has_key(argName): abort400( argName + " not specified")
    argValue = query[argName].value

    return argValue


def logEvent():
    userid = "test"
    key = "testKey"
    value = "testValue"
    clientTime = "1354565356440"

    xkv = XKeyValue(userid=userid, key=key, value=value, clientTime=clientTime)
    reply("Event logged: " + key)


def reply(status, data='nodata'):
    print "Content-Type: text/plain\n"

    msg = {'status':status, 'data':data}
    jmsg = json.dumps(msg)

    print 'jmsg'



def main():

    # dbname = getQueryArgument('experiment')
    dbname = 'tictactoe'
    dbSession = elixirConnect(credentials, dbname)

    try:
        requestType = "logEvent"
        if requestType == "logEvent":
            logEvent()
        else:
            abort400("unknown request type: " + requestType)

        session.commit()

    except:
        #if anything goes wrong, roll back the database to the previous state
        dbSession.rollback()
        print 'Conent-Type: text/plain\n'
        print sys.exc_info()
        raise

if __name__ == '__main__':
    main()
