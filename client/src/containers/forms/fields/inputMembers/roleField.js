import React from "react";
import {Input} from "reactstrap";

const RoleField = ({input, label, meta: {touched, error}}) => (
    <Input {...input} placeholder={label} type="select" className="col mr-2">
        <option value="subscriber">Abonnent</option>
        <option value="editor">Redakteur</option>
        <option value="owner">Eigentümer</option>
    </Input>
);

export default RoleField;