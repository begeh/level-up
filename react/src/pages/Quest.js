import React from 'react';
import Grid from '@material-ui/core/Grid';

import NavForApp from '../components/NavForApp';

export default function Quest() {

  const nodes = [
    {
      title: 'start',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'middle',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'end',
      isComplete: false,
      date: Date(Date.now()).toString()
    }
  ]

  const posts = [
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    },
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    },
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    }
  ] 

  const NodeBar = ({nodes}) => {
    return (
      <div>
        {nodes.map((node, index) => (
          <div>
          Node {node.isComplete ? 'done' : 'not done'}
          </div>
        ))}
      </div>
    )
  }
  
  const QuestList = ({posts}) => {
    return (
      <div>
        {
          posts.map((post, index) => (
            <QuestListItem title={post.title} date={post.date} symbol={post.symbol} comment_count={post.comment_count} index={index} />
          ))
        }
  
        <button>New Post</button>
  
      </div>
    )
  }
  
  const QuestListItem = ({title, date, symbol, comment_count}) => {
    return (
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <img src={symbol}/>
        <p>{comment_count}</p>
      </div>
    )
  }
  return (
    <>
    <NavForApp nav_title='QUEST' />
    <Grid container >
      <Grid item xs>
        <p>Hello</p>
      </Grid>

      <Grid item xs >
        <NodeBar nodes={nodes} />
        <QuestList posts={posts}/>
        
      </Grid>
    </Grid>
    </>
  );
}