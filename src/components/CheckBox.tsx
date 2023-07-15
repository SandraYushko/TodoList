import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
    checked: boolean
    callBack: (isDone:boolean)=>void
}


const CheckBox = (props: CheckBoxPropsType) => {
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
    );
};

export default CheckBox;




