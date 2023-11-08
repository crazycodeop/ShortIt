import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

const Link = ({inputValue}) => {
    const [shortenLink, setShortenLink]=useState("Hello World!");
    const [copied, setCopied]=useState(false);
    const [loading, setLoading]=useState(false);
    const [data, setData] = useState([]);

    const apiUrl = 'https://shrtlnk.dev/api/v2/link';

    const headers = {
      'api-key': 'swe9meqpwa80ntOFFmMa1zNF3OpplezNM5fYF9LmkWIGn',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const fetchData = (inputValue)=> {

      const requestBody = {
        url: inputValue,
      };

      axios.post(apiUrl, requestBody, { headers })
        .then(response => {
          setData(response.data);
        })
      }

    useEffect(()=>{
        if(inputValue.length) {
            fetchData(inputValue);
        }
    }, [inputValue])

    console.log(data);

    useEffect(()=>{
        const timer=setTimeout(() => {
            setCopied(false);
        }, 1000);
        return ()=>clearTimeout(timer);
    }, [copied]);

  return (
    <div className='result'>
      {/* <p>{shortenLink}</p> */}
      <CopyToClipboard 
        text={shortenLink}
        onCopy={()=>setCopied(true)}
        >
      <button className={copied?"copied":""}>Copy to clipboard</button>
      </CopyToClipboard>
    </div>
  )
}

export default Link
