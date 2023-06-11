export interface YearValues {
    traffic: number;
    registrations: number;
    emailsCollected: number;
    productSales: number;
    totalSales: number;
}

export const randomYearValues = (): YearValues => {
    return {
        traffic : Math.floor(Math.random() * 5000) + 33000,
        registrations : Math.floor(Math.random() * 300) + 1800,
        emailsCollected : Math.floor(Math.random() * 1500) + 2500,
        productSales : Math.floor(Math.random() * 150) + 800,
        totalSales : Math.floor(Math.random() * 100000) + 40000,
    }
}
