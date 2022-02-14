import { azure, apache, ivanti, mulesoft, servicenow } from "../../assets"

const migrationType = [
    {
        id: 1,
        img: azure,
        name: "Azure Logic Apps",
    },
    {
        id: 2,
        img: apache,
        name: "Apache Camel",
    },
    {
        id: 3,
        img: servicenow,
        name: "ServiceNow",
    },
    {
        id: 4,
        img: ivanti,
        name: "Ivanti",
    },
    {
        id: 5,
        img: mulesoft,
        name: "MuleSoft",
    }
]

export default migrationType;