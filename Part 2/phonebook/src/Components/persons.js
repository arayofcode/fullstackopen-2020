import React from "react";
import Person from "./person";

const Persons = ({persons, setPersons}) => {
    if( persons.length === 0){
        return <div>No data to show</div>
    }
    else{
        return(
            <ul>
                {persons.map(
                    (person) => <Person key={person.id} data={person} setPersons={setPersons}/>
                )}
            </ul>
        )
    }

}

export default Persons