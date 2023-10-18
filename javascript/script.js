document.addEventListener("DOMContentLoaded", () =>
{

    function getUnicodePoint(charactere)
    {
        if (charactere.length === 1)
        {
            const codePoint = punycode.ucs2.decode(charactere);
            return codePoint.map(point => 'U+' + point.toString(16)).join(' ');    
        }
    }

    const input = document.querySelector("input")
    const output = document.querySelector("output")
    const btnCopy = document.querySelector("#saida")
    const feedback = document.querySelector("#feedback")

    input.addEventListener("input", () =>
    {
        if (input.value.length !== 0)
        {
            output.innerHTML =  getUnicodePoint(input.value)
            return false
        }
        
        output.innerHTML =  ""
        return false
    })


    btnCopy.addEventListener("click", () =>
    {
        if (output.value.length !== 0)
        {
            const textarea = document.createElement("textarea")
            
            let textoFormatado = output.textContent.slice(2)
            textoFormatado = "\\" + textoFormatado
            textarea.value = textoFormatado
    
            document.body.appendChild(textarea)
    
            textarea.select()
    
            document.execCommand("copy")
    
            document.body.removeChild(textarea)

            feedback.style.display = "block"
            feedback.style.animation = "fadeIn 0.2s linear"

            setTimeout(() => 
            {
                feedback.style.display = "none"
            }, 2000)

            output.innerHTML = ""
            input.value = ""
            
            

            return false
        }
       
    })
})
