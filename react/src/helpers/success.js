export default function success({ apprentice, mentor, questTitle, nodes }, user_id, mentor_id) {
  console.log(nodes)
  // 5 node quest
  if (nodes.length === 5) {

    if (user_id === mentor_id) {
      return `
    In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. \n
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warm up to the intrepid adventurer. \n
    
    ${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge, though not an impossible one. \n
    
    “${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. “That’s my breakfast routine”. \n
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[3].title.toLowerCase()}.” \n
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy undertaking. \n
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks, and weeks into days.\n
     
    However, ${apprentice} persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted ${apprentice}’s weary face, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. \n
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, \n
    
    was but a warm up to the dynamic duo. Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge, though not an impossible one for the pair.\n
    
    “${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. “That’s my breakfast routine”. \n
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[3].title.toLowerCase()}.” \n
  
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy undertaking.\n

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks, and weeks into days. \n
    
    However, the two persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted their weary faces, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    }
  } else if (nodes.length === 4) {
    if (user_id === mentor_id) {
      return `
    In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. \n
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warm up to the intrepid adventurer. \n
    
    ${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge, though not an impossible one. \n
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[2].title.toLowerCase()}.” \n
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy undertaking. \n
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks, and weeks into days.\n
     
    However, ${apprentice} persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted ${apprentice}’s weary face, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. \n
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, \n
    
    was but a warm up to the dynamic duo. Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge, though not an impossible one for the pair.\n
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[2].title.toLowerCase()}.” \n
    
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy undertaking.

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks, and weeks into days. \n
    
    However, the two persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted their weary faces, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    }
  } else if (nodes.length === 3) {
    if (user_id === mentor_id) {
      return `In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}.\n
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warm up to the intrepid adventurer.\n
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[1].title.toLowerCase()}.” \n
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy undertaking. \n
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks, and weeks into days. \n
     
    However, ${apprentice} persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted ${apprentice}’s weary face, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventurer who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. \n
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, \n
    
    was but a warm up to the dynamic duo.
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[1].title.toLowerCase()}.” \n
    
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy undertaking. \n

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks, and weeks into days. \n 
    
    However, the two persevered, and before they knew it they had accomplished the unimaginable. The Sun peaked in the horizon. \n
    
    The cool morning breeze greeted their weary faces, almost in acknowledgement of their accomplishments. A glorious end to a glorious journey.`

    }
  }
}