console.clear(); // everytime codepen reloads

const { createStore, combineReducers } = Redux; // used when combining departments

// ACTION CREATOR: the person dropping off the form
const createClaim = (name, amountOfMoneyToCollect) => {
    return {  // ACTION: this is the form we are delivering
        type: 'CREATE CLAIM',
        payload: {
            name: name,
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    };
};

const createPolicy = (name) => {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: 20
        }
    };
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    };
};
////////////////////////////////////////
// Departments of the company (REDUCERS)
////////////////////////////////////////

// Claims: accepts/rejects form (action)
const claimsHistory = (oldListOfClaims = [], action) => {  // empty list of claims
    // does this form have a type we care about              we start with 0 claims
    if (action.type === 'CREATE_CLAIM') {
        // if YES
        return [...oldListOfClaims, action.payload];
        // create new array by spreading (...) the contents of    oldListOfClaims with the new payload from the form. 
    } return oldListOfClaims;

};

// Accounting: pays for claims and/or charges new policy fees
const accounting = (bagOfMoney = 100, action) => {  // at first, add initial value (10)
    // are they trying to create a new claim (take our money)?
    if (action.type === 'CREATE_CLAIM') {
        // if YES
        return bagOfMoney - action.payload.amountOfMoneyToCollect
        // subtract the the amount of money from our bag of money
    } else if (action.type === 'CREATE_POLICY') {
        // if they want to create a new policy take the fee (20$)
        return bagOfMoney + action.payload.amount;
        // notice you dont need to spread ...bagOfMoney to create a new array, javascript knows that its working with (ultimately) an integer (immutable) and will always notice the change.
    }
    return bagOfMoney;
}

// Policies: are they starting or ending a policy?
const policies = (listOfPolicies = [], action) => {    // empty list of claims
    // is this a new policy                             we start with 0 customers
    if (action.type === 'CREATE_POLICY') {
        // if YES
        return [...listOfPolicies, action.payload.name];
        // spread the new members name into the list of policies
    } else if (action.type === 'DELETE_POLICY') {
        // first check if someone actually owns that policy
        return listOfPolicies.filter(policy => policy != action.payload.name);
    }
    return listOfPolicies;
};

// NOW we have our three departments! lets stitch them together into a REDUX STORE

// First we setup the company by instantiating a new object which ACTUALLY represents pretty much the entirety of our "company".
const ourDepartments = combineReducers({
    accounting: accounting,  // key(for new object) : value (return of accounting fn.)
    claimsHistory: claimsHistory, // " "
    policies: policies // " "
});

const store = createStore(ourDepartments);  // create store function imported from Redux (line 3)

store.dispatch(createPolicy('Alex')); // makes a new policy, registers name and adds 20$ to bagOfMoney 
store.dispatch(createClaim('Alex', 100)); // lest say Alex is making a claim consting 100$
store.dispatch(deletePolicy('Alex'));

store.dispatch(createPolicy('Alex')); // makes a new policy, registers name and adds 20$ to bagOfMoney 
store.dispatch(createClaim('Alex', 100)); // lest say Alex is making a claim consting 100$
store.dispatch(deletePolicy('Alex'));

console.log(store.getState());  // shows us every object currently in the store along with the customers name, total money in the company bag, and history of previous claims. These are returned following the object in ourDepartments.
