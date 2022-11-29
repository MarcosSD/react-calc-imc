import { useState } from 'react'
import styles from './App.module.css'
import poweredImg from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'
import {levels, calculateIMC, Level} from './helpers/imc'
import { GridItem } from './components/GridItem'

const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null)

  const btnCalcular = () => {
    if(heightField && weightField){
      setToShow(calculateIMC(heightField,weightField));
    }
  }

  const btnVoltar = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header className={styles.headerContainer}>
        
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para índice de Massa Corpórea. Parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal para cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
            type="number" 
            placeholder='Digite seu peso. Ex: 83.8 (em Kg)'
            value={weightField > 0 ? weightField : ""}
            onChange = {e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={btnCalcular} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && 
            <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }
          {toShow &&
           <div className={styles.righBig}>
            <div className={styles.rightArrow} onClick={btnVoltar}>
              <img src={leftArrowImage} alt="" width={25}/>
            </div>
            <GridItem item={toShow}/>
           </div> 
            
          }
        </div>
      </div>
    </div>
  )
}

export default App;