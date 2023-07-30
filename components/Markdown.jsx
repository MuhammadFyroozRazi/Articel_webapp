'use client'
import {FaBold} from 'react-icons/fa'
import {FiCode} from 'react-icons/fi'
import {GrItalic} from 'react-icons/gr'
import {PiTextAlignLeftFill,PiTextAlignJustifyFill,PiTextAlignRightFill} from 'react-icons/pi'
import {BiFontColor} from 'react-icons/bi'
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'

import { useState,useRef, useEffect } from "react"

const Markdown = () => {
  const textAreaRef = useRef(null)

  const [ text,setText] =useState('')
  const [ fontSz,setFontSz] =useState('0')
  const [edit,setEdit] = useState(true)


  const handleTagClick= (tagName) => {
    const selectionStart =textAreaRef.current.selectionStart 
    const selectionEnd =textAreaRef.current.selectionEnd 

    if (selectionStart != selectionEnd) {
      // const paras = text.split('\n')
      const indexOfSelectedStart = text.substring(0,selectionStart).split('\n').length-1
      const indexOfSelectedEnd = text.substring(0,selectionEnd).split('\n').length-1

      // if both the index are same 
      if(indexOfSelectedEnd == indexOfSelectedStart) {
        const firstTextPortion = text.substring(0,selectionStart)
        const lastTextPortion = text.substring(selectionEnd)
        const textToReplace = `<${tagName}>${text.substring(selectionStart,selectionEnd)}</${tagName}>`
        setText(firstTextPortion+textToReplace+lastTextPortion)
        // setText(pre=>pre.replace(pre.substring(selectionStart,selectionEnd),`<${tagName}>${pre.substring(selectionStart,selectionEnd)}</${tagName}>`)) 
      }
      else{
        const selectedText = text.substring(selectionStart,selectionEnd)
        const replaceText =`<${tagName}>${selectedText}</${tagName}>`

        setText(pre=>pre.replace(selectedText,replaceText))
        
        const paras = text.split('\n')
        // console.log(paras);
        const startPara=paras[indexOfSelectedStart]
        const endPara = paras[indexOfSelectedEnd]

        console.log(startPara,endPara);

        paras[indexOfSelectedStart] = startPara.replace(startPara,`${startPara}</${tagName}>`)
        paras[indexOfSelectedEnd] = endPara.replace(endPara,`<${tagName}>${endPara}`)
        setText(paras.join('\n'))

      }

      // if both index are near 
      // else if(indexOfSelectedEnd-1 == indexOfSelectedStart){

      //   const startPara = paras[indexOfSelectedStart]
      //   const endPara = paras[indexOfSelectedEnd]
        
      //   paras[indexOfSelectedStart] = startPara.replace(startPara.substring(selectionStart),`<${tagName}>${startPara.substring(selectionStart)}</${tagName}>`)

      //   paras[indexOfSelectedEnd] = endPara.replace(endPara.substring(0,selectionEnd),`<${tagName}>${endPara.substring(0,selectionEnd)}</${tagName}>`)

      //   setText(paras.join('\n'))
      // }

      // else{
      //   for (let index = indexOfSelectedStart; index < indexOfSelectedEnd+1; index++) {
      //     console.log(paras[index]);
          
      //   }
      // }
    }
    else{
      const paras = text.split('\n')
      const indexOfSelectedPara = text.substring(0,selectionStart).split('\n').length-1
      paras[indexOfSelectedPara]=`<${tagName}>${paras[indexOfSelectedPara]}</${tagName}>`
      setText(paras.join('\n'))
    }

  }

  const handleEditButton = () =>{
    const listOfParas = text.split('\n')
    console.log(listOfParas);
  }
 if(edit){
  return (
    <section className="markdown-section">
      <nav className="markdown-section__nav">
        <button className="markdown-section__nav__btn"><span>{`<`}</span> previous page</button>
        <button className="markdown-section__nav__btn edit-btn" 
          onClick={handleEditButton}
        >{edit === false ? 'edit' : 'done'}</button>
        <button className="markdown-section__nav__btn"> next page<span>{`>`}</span></button>
      </nav>
        
      <div className="markdown-section__keys">  
        <div className="markdown-section__keys-text-btn">
          <button  onClick={()=>handleTagClick('h1')}>h1</button>
          <button  onClick={()=>handleTagClick('b')}><FaBold/></button>
          <button  onClick={()=>handleTagClick('c')}><FiCode/></button>
          <button  onClick={()=>handleTagClick('i')}><GrItalic/></button>
          <button  onClick={()=>handleTagClick('clr')}><BiFontColor/></button>
        </div>

        <div className="markdown-section__keys-content-btn">
          <button  onClick={()=>handleTagClick('aj')}><PiTextAlignJustifyFill /></button>
          <button  onClick={()=>handleTagClick('ar')}><PiTextAlignLeftFill/></button>
          <button  onClick={()=>handleTagClick('al')}><PiTextAlignRightFill/></button>
        </div>

        <div className="markdown-section__keys-p">
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)-1).toString())}> <IoIosArrowBack/> </button>
          <input type="text" value={fontSz} className="markdown-section__keys-p-in" 
          onChange={(e)=> setFontSz(e.target.value.toString())}/>
          <button onClick={()=>setFontSz(pre=>(parseInt(pre)+1).toString())}><IoIosArrowForward/> </button>
        </div>
      </div>

      <textarea ref={textAreaRef} className="markdown-section__textarea" placeholder="text..." type="text" value={text} 
        onChange={(e)=>{
          setText(e.target.value)
        }}/>
        {/* <div contentEditable ref={textAreaRef} onInput={(e)=>{
          setText(e.target.textContent)
        }}>{text[-1]}</div> */}
    </section>
  );}
  // else{
  //   return(
      
  //   )
  }


export default Markdown