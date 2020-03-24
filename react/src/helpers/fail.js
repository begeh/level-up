import {convertDate} from './convertDate';

export default function fail({apprentice, mentor, questTitle, node1, node2, node3, node4, node5, dateStart, dateEnd}, num_completed_nodes){
  const story_parts = [
    `The first step of their quest, which was to ${node1}, was but a warmup to the dynamic duo.`
    ,
    `Their second objective, which was to ${node2} was a tough challenge but it wasn’t an impossible task for the two.`
    , 
    `“${node3}?” ${apprentice} gushed. “That’s my breakfast routine”.“Take this as an opportunity to catch your breath and plan ahead because your next task is to ${node4}.”`
    ,
    `Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.`
    ,
    `At long last, the two reached the final phase of their arduous quest, which was to ${node5}. Days turned into weeks and weeks turned into days.`
  ];

  let story = [ `In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle}. With their trusted mentor, ${mentor} by their side, the odds were in their favour.`];

  //cycles through story_parts and adds stories for the nodes that were completed prior to abandonging mission
  for(let i = 0; i < num_completed_nodes; i++){
    story.push(story_parts[i]);
  };

  const date = (new Date(dateEnd)).getTime() - (new Date(dateStart)).getTime();

  //converts times spent on quest into readable time interval (e.g. seconds, minutes, days, years, etc.)
  const experience = convertDate(date);

  console.log(`Number of nodes completed ${num_completed_nodes} and Days of experience ${experience}`);

  //fail story line to append at end of completed node tasks
  const fail_line = `It appeared as if lady luck had turned a blind eye to their fate, however. The expected became the unexpected and it was soon clear to ${mentor} that it was simply not the right time for ${apprentice} to ${questTitle}. Without any delay, ${mentor} broke the news to his pupil. It was a rough for ${apprentice} to face the music but ${apprentice} accepted the reality of thesituation. “Fear not. Take as much time as you need to vent but do not dwell forever in today’s failure. Instead, take it as a marker... a marker for progressfrom where you started. For should you decide to partake this quest again, you would be ${experience} ahead. That my friend, is the meaning of experience.” A smile crept upon ${apprentice}’s face as he heeded his mentor’s words and looked forward to the day he decides to ${questTitle} again.`;

  story.push(fail_line);

  story = story.join('\r\n');

  console.log(`Fail Story is ${story}`);

  return story;

}