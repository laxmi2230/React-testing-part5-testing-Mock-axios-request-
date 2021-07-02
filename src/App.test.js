import React from 'react'
import { render, cleanup, waitForElement } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import axiosMock from "axios"
import App from './App'

afterEach(cleanup);

it("fetches displays data", async () => {
axiosMock.get.mockResolvedValueOnce({data: {greeting: "hello world"}});

    const url = "/greeting"
    const { getByTestId } = render(<App url={url}/>)
    

    expect(getByTestId('loading')).toHaveTextContent("Loading data...")
    

    const resolvedSpan = await waitForElement(() => getByTestId("resolved") )

    expect(resolvedSpan).toHaveTextContent("hello world");
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
})


