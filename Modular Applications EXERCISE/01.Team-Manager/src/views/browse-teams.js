import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { get } from "../api/api.js";
import { teamDetails } from "./team-details.js";

const teamsData = await get('/data/teams');
const members = await get('/data/members?where=status%3D%22member%22');

const teams = {};

members.forEach((member) => {

    const id = member.teamId;
   
    if (!teams[id]) {
        teams[id] = 1;
    } else {
        teams[id] += 1;
    }

});

export const browseTeamTemp = (user) => html`
<section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

${user
        ? html`
<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>`
        : nothing
    }

${teamsData.map((team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${teams[team._id]} Members</span>
        <div><a href="/details" class="action" id=${team._id} @click=${teamDetails()}>See details</a></div>
    </div>
</article>`)}


</section>`;

export function browse(ctx) {
    ctx.render(browseTeamTemp(ctx.user));

}