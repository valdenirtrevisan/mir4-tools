import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Container from "./components/Container";
import DailyItem from "./components/DailyItem";
import { Daily } from "./domain/Daily";
import Button from './components/Button';
import Input from "./components/Input";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [input, setInput] = useState<string>('');
  const [dailys, setDailys] = useLocalStorage<Daily[]>('daily', [
    {
      id: uuidv4(),
      decription: "Doação no Clan",
      completed: false,
    },
    {
      id: uuidv4(),
      decription: "Invocação de Cobre",
      completed: false,
    },
  ]);

  const updatedDaily = (id: string) => {
    const updatedDailys = dailys.map((daily) => ({
      ...daily,
      completed: daily.id === id ? !daily.completed : daily.completed,
    }));

    setDailys(updatedDailys);
  };

  const deleteDaily = (id: string) => {
    const updatedDailys = dailys.filter((daily) => id !== daily.id);

    setDailys(updatedDailys);
  };

  const addDaily = () => {
    if (input.trim().length > 0) {
      setDailys([...dailys, {
        id: uuidv4(),
        decription: input,
        completed: false,
      }]);

      setInput('');
    }
  }

  const resetDaily = () => {
    const updatedDailys = dailys.map((daily) => ({
      ...daily,
      completed: false,
    }));

    setInput('');
    setDailys(updatedDailys);
  }

  return (
    <Container title="Diárias">
      <div className="m-4 flex justify-between gap-2">
        <Input value={input} onChange={(event: any) => setInput(event.target.value)} />
        <Button onClick={() => addDaily()}>Incluir</Button>
        <Button onClick={() => resetDaily()}>Resetar</Button>
      </div>
      <div className="border rounded m-4 ">
        {dailys.map((daily) => (
          <DailyItem key={daily.id} daily={daily} updatedDaily={updatedDaily} deleteDaily={deleteDaily} />
        ))}
      </div>
    </Container>
  );
}

export default App;
