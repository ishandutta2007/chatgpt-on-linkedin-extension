import React from 'react'

const SecondaryRoundedButton = (props: Props) => {
  return (
    <button className='bg-indigo-500 py-4 px-10 text-white inline-flex items-center justify-center rounded-full text-center text-base font-normal hover:bg-opacity-90 lg:px-8 xl:px-10'
      onClick={props.onClick}>
      {props.displayText}
    </button>
  )
}

export default SecondaryRoundedButton
//https://tailgrids.com/components/buttons