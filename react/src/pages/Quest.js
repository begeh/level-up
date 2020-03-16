import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn'


export default function Quest(props) {
  const state = props.location.state;

  console.log(props);
  console.log(`Quest State is ${state}`);

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
  
        <CreatePostBtn />

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
    <NavForApp nav_title='QUEST' state={state}/>
    <Grid container >
      <Grid className='container-left' item sm={5}>
        <p>Hello</p>
      </Grid>

      <Grid className='container-right' item xs={12} sm={7} >
        <NodeBar nodes={nodes} />
        <QuestList posts={posts}/>
        
      </Grid>
    </Grid>
    </>
  );
}