import { render, screen } from "@testing-library/react"
import { describe } from "node:test"

const addnums = (n1: number, n2: number) => {
  return n1 + n2
}

describe("addnums", () => {
  it("should add two numbers correctly", () => {
    expect(addnums(1, 1)).toBe(2)
  })
})
