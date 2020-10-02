console.log('Hello');
const endPoint = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";
const main = document.querySelector('main');
const nextTopic = document.querySelector('.next_topic');
const pastTopic = document.querySelector('.past_topic');
const nextTopicHeading = document.querySelector('.next_heading');
const pastTopicHeading = document.querySelector('.recent_heading');
const addBtn = document.querySelector('.add');
const input = document.querySelector('.title');
const formInput = document.querySelector('.form_input');

async function fetchTopic() {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;

}
const showList = e => {
    undiscussedTopic();
    discussedTopic();
}
async function undiscussedTopic() {
    const topicList = await fetchTopic();
    const filteredTopic = topicList.filter(topic => topic.discussedOn === "");
    console.log(filteredTopic);
    const newTopicHTML = filteredTopic
        .map(topic => {
            return `
            <article class="new_topic">
                <button class="button archieve"><img src="" alt="" class="icon">Archieve</button>
                <p class="topic">${topic.title}</p>
                <div class="vote">
                    <button class="button upvotes"><img src="" alt="" class="icon">${topic.upvotes}</button>
                    <button class="button downvotes"><img src="" alt="" class="icon">${topic.downvotes}</button>
                </div>
            </article>

            `;
        })
        .join('');
    nextTopicHeading.insertAdjacentHTML('afterend', newTopicHTML);
}
async function discussedTopic() {
    const topicList = await fetchTopic();
    const filteredTopic = topicList.filter(topic => topic.discussedOn !== "");
    console.log(filteredTopic);
    const pastTopicHTML = filteredTopic
        .map(topic => {
            return `
            <article class="new_topic">
                <button class="button archieve"><img src="" alt="" class="icon">Archieve</button>
                <p class="topic">${topic.title}</p>
                <span class="date">${topic.discussedOn}</span>
                <div class="vote">
                    <button data-id="${topic.id}" class="button upvotes"><img src="" alt="" class="icon">${topic.votes}</button>
                    <button data-id="${topic.id}" class="button downvotes"><img src="" alt="" class="icon">${topic.downvotes}</button>
                </div>
            </article>

            `;
        })
        .join('');
    pastTopicHeading.insertAdjacentHTML('afterend', pastTopicHTML);
}
const addNewList = e => {
    formInput.addEventListener('submit', e => {
        e.preventDefault();
        const addTopic = `
                    <article class="add_topic">
                        <button class="button archieve"><img src="" alt="" class="icon">Archieve</button>
                        <p class="topic">${input.value}</p>
                        <div class="vote">
                            <button class="button upvotes"><img src="" alt="" class="icon"></button>
                            <button class="button downvotes"><img src="" alt="" class="icon"></button>
                        </div>
                    </article>
        `;
nextTopicHeading.insertAdjacentHTML('afterend', addTopic);
formInput.reset();

    })
    
}
addBtn.addEventListener('click', addNewList);
fetchTopic();
showList();
