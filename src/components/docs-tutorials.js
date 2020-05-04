import React from "react"

const DocsTutorials = () => (
  <div className="DocsTutorials">
    <div className="DocsTutorials--item DocsTutorials--item-header">
      <div className="DocsTutorials--item-name">
        <span className="DocsTutorials--item-header-text">Name</span>
      </div>
      <div className="DocsTutorials--item-updated">
        <span className="DocsTutorials--item-header-text">Updated</span>
      </div>
      <div className="DocsTutorials--item-difficulty">
        <span className="DocsTutorials--item-header-text">Difficulty</span>
      </div>
      <div className="DocsTutorials--item-length">
        <span className="DocsTutorials--item-header-text">Length</span>
      </div>
    </div>

    <div className="DocsTutorials--item DocsTutorials--item-is-new">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Build a web scraper</a>
      </div>
      <div className="DocsTutorials--item-updated">Today</div>
      <div className="DocsTutorials--item-difficulty">Expert</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '20%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Build an application</a>
      </div>
      <div className="DocsTutorials--item-updated">7d ago</div>
      <div className="DocsTutorials--item-difficulty">Beginner</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '50%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Build a todo list with Workers KV</a>
      </div>
      <div className="DocsTutorials--item-updated">12d ago</div>
      <div className="DocsTutorials--item-difficulty">Beginner</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '10%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Build a serverless function</a>
      </div>
      <div className="DocsTutorials--item-updated">1m ago</div>
      <div className="DocsTutorials--item-difficulty">Beginner</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '80%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Deploy a react app</a>
      </div>
      <div className="DocsTutorials--item-updated">3m ago</div>
      <div className="DocsTutorials--item-difficulty">Beginner</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '70%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Hosting static Wordpress sites</a>
      </div>
      <div className="DocsTutorials--item-updated">4m ago</div>
      <div className="DocsTutorials--item-difficulty">Beginner</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '100%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Configure a CDN</a>
      </div>
      <div className="DocsTutorials--item-updated">1y ago</div>
      <div className="DocsTutorials--item-difficulty">Advanced</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '50%'}}></div>
        </div>
      </div>
    </div>
    <div className="DocsTutorials--item">
      <div className="DocsTutorials--item-name">
        <a className="DocsTutorials--item-link" href="/tutorials">Managing multiple projects with Lerna</a>
      </div>
      <div className="DocsTutorials--item-updated">2y ago</div>
      <div className="DocsTutorials--item-difficulty">Advanced</div>
      <div className="DocsTutorials--item-length">
        <div className="DocsTutorials--item-length-bar">
          <div className="DocsTutorials--item-length-bar-inner" style={{width: '70%'}}></div>
        </div>
      </div>
    </div>
  </div>
)

export default DocsTutorials
