public with sharing class UserClass {
    @AuraEnabled(cacheable=true)
    public static String getUserFullname(Id userId){
        try {
        User u = [SELECT FirstName, LastName FROM User WHERE Id=:userId WITH SECURITY_ENFORCED LIMIT 1];
        String fullname = u.FirstName + ' ' + u.LastName; 
        return fullname; 
    } catch (QueryException e){
        System.debug('QueryException occurred: ' + e.getMessage());
        throw e;  
    } catch (Exception e){
        System.debug('Exception occured ' + e.getMessage());
        throw e; 
    }
    }
}