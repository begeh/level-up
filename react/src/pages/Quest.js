import React from 'react';
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core';
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn'
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'



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
      title: "post One",
      date: 'March 12, 2020',
      symbol: sword,
      comment_count: 5,
    },
    {
      title: "post 1",
      date: 'March 12, 2020',
      symbol: book,
      comment_count: 5,
    },
    {
      title: "post 1",
      date: 'March 12, 2020',
      symbol: question,
      comment_count: 5,
    }
  ] 

  const NodeBar = ({nodes}) => {
    return (
      <Grid item xs={12}>
        <Stepper >
          {nodes.map((node, index) => {
    
            return (
              <Step key={index} >
                <StepLabel className={node.isComplete ? 'completed-node' : 'uncompleted-node'} />
              </Step>
            );
          })}
        </Stepper>
      </Grid>
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
      <Grid container>
        <Grid item xs={3}>
        <img src={symbol} alt={title} width="120" height="120"/>
        </Grid>
        <Grid item xs={9}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{comment_count}</p>
        </Grid>
      </Grid>
    )
  }
  return (
    <>
    <NavForApp nav_title='QUEST' state={state}/>
    <Grid container className='full'>
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