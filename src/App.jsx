import Card from './components/Card';
import ScoreTracker from './components/ScoreTracker';
import usePokemonApi from './hooks/usePokemonApi';
import useScoreHandler from './hooks/useScoreHandler';
import useCardHandler from './hooks/useCardHandler';
import './styles/App.css'

function App() {
  
  const _dataHandler = usePokemonApi();
  const _scoreHandler = useScoreHandler();
  const _cardHandler = useCardHandler();

  const [data, loading] = [_dataHandler.data, _dataHandler.loading];

  return (
    <>
      <header>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <p>Click the images to gain points, but don't click the same one twice!</p>
        </div>
        <ScoreTracker 
          scoreHandler={_scoreHandler}
        />
      </header>
      <main>        
        <div id="cards-wrapper">
          {data.map(pokemon => {
            return (
              <Card
                key={`${pokemon.name} card`}
                character={pokemon}
                cardHandler={_cardHandler}
                scoreHandler={_scoreHandler}
                funcs={[_dataHandler.shuffleData]}
              />
            )
          })}

        </div>
      </main>
    </>
  )
}

export default App
