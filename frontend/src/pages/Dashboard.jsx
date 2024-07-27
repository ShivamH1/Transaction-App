// This is the Dashboard component. It is a React functional component
// that returns some JSX (JavaScript XML) which will be rendered to the screen.

// The component imports other components that are used within it.
// These components are imported using their relative paths from the current file.
import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'

// The function itself is named Dashboard and takes no arguments.
// It returns a JSX element that will be rendered to the screen.
export function Dashboard() {
  // The JSX element is a div that contains several other components.
  // The div has a className of 'm-8' which applies a margin of 8 units to all sides.
  return (
    <div>
      {/* The Appbar component is rendered as a child of the div. */}
      <Appbar />
      {/* The div contains a div with a className of 'm-8'. */}
      <div className='m-8'>
        {/* The Balance component is rendered as a child of the second div. */}
        {/* The Balance component is passed a prop named 'value' with a value of 10000. */}
        <Balance value={10000}/>
        {/* The Users component is rendered as a child of the second div. */}
        <Users />
      </div>
    </div>
  )
}

