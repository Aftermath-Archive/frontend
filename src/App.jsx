import { useState } from "react";
import "./App.css";

import { Button } from "./components/ui/button";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1 className='text-4xl font-bold'>Aftermath Archive</h1>

            <h2 className='text-xl'>Shadcn UI test</h2>
            <Button>click me! (i do nothing)</Button>
        </>
    );
}

export default App;
