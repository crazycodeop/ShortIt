import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

const Link = ({inputValue}) => {
    const [shortenLink, setShortenLink]=useState("Hello there!");
    const [copied, setCopied]=useState(false);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    
    const fetchData = async (inputValue) => {
      setLoading(true);
      const encodedParams = new URLSearchParams();
      encodedParams.set('url', inputValue);
      const options = {
        method: 'POST',
        url: 'https://url-shortener-service.p.rapidapi.com/shorten',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '461c9e292emsh2968541a1ad61c0p14062cjsnc34da2e8fad4',
          'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        data: encodedParams,
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setShortenLink(response.data.result_url);
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
        Something went wrong :(
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
