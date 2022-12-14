import React, { useState } from 'react'
import {RefreshIcon} from '@heroicons/react/outline'
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from '../components/Tweet';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast'

interface Props{
  tweets: Tweet[]
}
function Feed({ tweets: tweetsProp }: Props) {
  
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  //console.log(tweets);

  /**Functionalites of Refreshing  */
  const handleRefresh = async () => {

    const refreshToast = toast.loading('Refreshing');

    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed Updated Successfully',{
      id: refreshToast,
    })
  }
  
  return (
    <div className='col-span-7 border-x lg:col-span-5 overflow-auto scrollbar-hide  max-h-screen ' >
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon onClick={handleRefresh} className='h-8 w-8 cursor-pointer text-twitter 
            mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>

        {/**TweetBox */}
          <div className='position-sticky'>
            <TweetBox setTweets={setTweets}/>
          </div>

        {/**Feed */}
        <div className=' '>
          {tweets?.length>0 &&(
            <div >
              {tweets.map(tweet => (
                <TweetComponent key={tweet._id} tweet = {tweet}/>
              ))}
            </div>
          )}
        </div>
        
        
    </div>
  )
}

export default Feed