import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import DailyItem from "@components/DailyItem";
import { Daily } from "@domain/Daily";
import Button from '@components/Button';
import { useLocalStorage } from "@hooks/useLocalStorage";
import Input from "@components/Input";
import Container from "@components/Container";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const initialDailys = [{
  id: uuidv4(),
  decription: "Doar recursos para o clã",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Pegar presentes (Evento)",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Invocação de cobre e Intensificar",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Raid",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Raide Boss",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Praça Mágica",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Pico Secreto",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Comprar 20 pedras de aprimoramento",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Zootropo",
  completed: false,
},
{
  id: uuidv4(),
  decription: "Pegar o vigor após completar as 10 diárias",
  completed: false,
}]

function Dailys() {
  const [input, setInput] = useState<string>('');
  const [dailys, setDailys] = useLocalStorage<Daily[]>('daily', initialDailys);
  const [lastRestDaily, setLastRestDaily] = useLocalStorage<number>('lastRestDaily', new Date().getTime());

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
    setLastRestDaily(new Date().getTime());
    setDailys(updatedDailys);
  }

  const restoureDaily = () => {
    setInput('');
    setDailys(initialDailys);
  }

  return (
    <Container title="Diárias">
      <p className="m-4 text-justify leading-relaxed">Utilize está pagina como controle para validar quais ações seu personagem já realizou no dia, você pode incluir ou excluir uma nova ação, resetar as ações concluídas manualmente ou restaurar a página removendo os itens personalizado e voltando as ações iniciais.</p>
      <p className="m-4 text-right text-sm">{`Último reset realizado • ${format(new Date(lastRestDaily), "d' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
      })}`}</p>
      <div className="m-4 flex justify-between gap-2">
        <Input value={input} onChange={(event: any) => setInput(event.target.value)} />
        <Button onClick={() => addDaily()}>Incluir</Button>
        <Button onClick={() => resetDaily()}>Resetar</Button>
        <Button onClick={() => restoureDaily()}>Restaurar</Button>
      </div>

      <div className="border rounded m-4 ">
        {dailys.map((daily) => (
          <DailyItem key={daily.id} daily={daily} updatedDaily={updatedDaily} deleteDaily={deleteDaily} />
        ))}
      </div>
    </Container>
  );
}

export default Dailys;
