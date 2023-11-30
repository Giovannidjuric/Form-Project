public without sharing class CasesClass {
    @AuraEnabled
    public static List<Case> insertCases(List<Case> casesToInsert){
        try {
            SObjectAccessDecision securityDecision = Security.stripInaccessible(
                                         AccessType.CREATABLE, casesToInsert);

        // No exceptions are thrown and no rating is set
        insert securityDecision.getRecords();
        return casesToInsert;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}