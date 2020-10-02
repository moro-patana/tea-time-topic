console.log('Hello');
const endPoint = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";
const nextTopic = document.querySelector('.next_topic');
const pastTopic = document.querySelector('.past_topic');
const nextTopicHeading = document.querySelector('.next_heading');
const pastTopicHeading = document.querySelector('.recent_heading');
async function fetchTopic() {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;

}

async function populateTopic() {
    const topicList = await fetchTopic();
    let undiscussedTopic = [];
    let discussedTopic = [];
for (let i = 0; i < topicList.length; i++) {
    if (topicList[i].discussedOn === "") {
        undiscussedTopic.push(topicList[i]);
        const newTopicHTML = undiscussedTopic
        .map(topic => {
            return `
            <article class="new_topic">
                <button class="button archieve"><img src="" alt="" class="icon">Archieve</button>
                <p class="topic">${topic.title}</p>
                <span class="date"></span>
                <div class="vote">
                    <button class="button upvoted"><img src="" alt="" class="icon">Upvoted</button>
                    <button class="button downvoted"><img src="" alt="" class="icon">Downvoted</button>
                </div>
            </article>

            `;
        })
        .join('');
        nextTopicHeading.insertAdjacentHTML('afterend', newTopicHTML);

    } else {
        discussedTopic.push(topicList[i]);
        const pastTopicHTML = discussedTopic
        .map(topic => {
            return `
            <article class="new_topic">
                <button class="button delete"><img src="" alt="" class="icon">Delete</button>
                <p class="topic">${topic.title}</p>
                <span class="date">${topic.discussedOn}</span>
            </article>

            `;
        })
        .join('');
        pastTopicHeading.insertAdjacentHTML('afterend', pastTopicHTML);

    }

}
    console.log(undiscussedTopic);
    console.log(discussedTopic);
}
fetchTopic();
populateTopic();
