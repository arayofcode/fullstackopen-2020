import React from "react";
import Person from "./person";

const Persons = ({persons}) => {
    if( persons.length === 0){
        return <div>No data to show</div>
    }
    else{
        return(
            <ul>
                {persons.map(
                    (person) => <Person key={person.id} name={person.name} number={person.number}/>
                )}
            </ul>
        )
    }

}



export default Persons