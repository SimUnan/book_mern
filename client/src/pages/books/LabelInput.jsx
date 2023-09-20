import React from 'react'

const LabelInput = ({Label, InputType, InputValue, InputPlaceholder, InputOnChange, InputnName, TextAreaValue, TextArea, TextAreaName, TextAreaPlaceholder, TextAreaOnChange}) => {
    return (
        <div className={`w-full ${TextArea ? "flex-col" : "flex"} items-center justify-center gap-4`}>
            <label htmlFor="" className='text-xl font-semibold'>{Label}:</label>
            {
                TextArea 
                ? 
                <textarea name={TextAreaName} value={TextAreaValue} placeholder={TextAreaPlaceholder} onChange={TextAreaOnChange} rows="4" className=' mt-3 w-full bg-transparent border-[1px] border-gray-400 rounded-lg px-3 py-1' />
                :
                <input type={InputType} value={InputValue} placeholder={InputPlaceholder} name={InputnName} onChange={InputOnChange} className='w-full bg-transparent border-[1px] border-gray-500 rounded-md px-3 py-1'/>
            }
        </div>
    )
}

export default LabelInput
