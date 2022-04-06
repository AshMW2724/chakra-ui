import * as React from "react"
import { screen, renderInteractive } from "@chakra-ui/test-utils"
import { ColorModeProvider, useColorMode, useColorModeValue } from "../src"
import { defaultThemeOptions } from "./utils"

const lightValue = "light-value"
const darkValue = "dark-value"

function DummyComponent() {
  const { colorMode, toggleColorMode } = useColorMode()
  const value = useColorModeValue(lightValue, darkValue)

  return (
    <>
      <h1 data-testid="mode">{colorMode}</h1>
      <button onClick={toggleColorMode}>{value}</button>
    </>
  )
}

describe("useColorModeValue", () => {
  test("given light mode, shows lightValue and toggles", async () => {
    const { user } = renderInteractive(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = screen.getByRole("button")

    expect(screen.getByTestId("mode")).toHaveTextContent("light")
    expect(button).toHaveTextContent(lightValue)

    await user.click(button)

    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
    expect(button).toHaveTextContent(darkValue)
  })
})
