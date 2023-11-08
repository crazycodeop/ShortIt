import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

const Link = ({inputValue}) => {
    const [shortenLink, setShortenLink]=useState("Hello World!");
    const [copied, setCopied]=useState(false);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    
    const fetchData = async (inputValue) => {
      setLoading(true);
      const options = {
        method: 'POST',
        url: 'https://shrtlnk.dev/api/v2/link',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'swe9meqpwa80ntOFFmMa1zNF3OpplezNM5fYF9LmkWIGn',
          'Accept': 'application/json'
        },
        data: {
          url: inputValue
        }
      };
      
      try {
        const response = await axios.request(options );
        console.log(response.data);
        setShortenLink(response.data.shrtlnk);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
        if(inputValue.length) {
            fetchData(inputValue);
        }
    }, [inputValue])

    useEffect(()=>{
        const timer=setTimeout(() => {
            setCopied(false);
        }, 1000);
        return ()=>clearTimeout(timer);
    }, [copied]);

    if(loading) {
      return <p className='noData'>
        Loading...
      </p>
    }

    if(error) {
      return <p className='noData'>
        Something went wrong ;(
      </p>
    }

  return (
    <>
      {shortenLink && (
        <div className='result'>
        <p>{shortenLink}</p>
        <CopyToClipboard 
          text={shortenLink}
          onCopy={()=>setCopied(true)}
          >
        <button className={copied?"copied":""}>Copy to clipboard</button>
        </CopyToClipboard>
      </div>
      )}
    </>
  )
}

export default Link;
