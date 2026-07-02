"use client"

import { useState } from "react"

export default function MyButton(props: any) {
  const [val, setValue] = useState("park")

  const L = (
    <ul>
      {props.products.map((p: any) => (
        <li key={p.title}>{p.title}</li>
      ))}
    </ul>
  )
  return (
    <>
      <p>
        Hello, {props.person.name}! You are {props.person.age} years old.{" "}
        {props.person.age >= 18 ? "you're old.." : "you're not that old."}
        {props.poulet}
      </p>
      <h1>{val}</h1>
      {L}

      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </>
  )
}
