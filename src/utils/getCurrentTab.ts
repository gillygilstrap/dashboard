import { tabs } from "../constants"

export const getCurrentTab = ():string => {
    const url = window.location.href

    if(url.includes(`/${tabs.ORDERS.toLowerCase()}`)) {
        return tabs.ORDERS
    }
    if(url.includes(`/${tabs.USERS.toLowerCase()}`)) {
        return tabs.USERS
    }

    return tabs.STATS
}