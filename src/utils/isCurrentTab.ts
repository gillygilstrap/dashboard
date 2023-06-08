export const isCurrentTab = (currentTab: string, tabInQuestion: string): boolean => {
    if(currentTab === tabInQuestion) {
        return true;
    }

    return false
}