# mod-db

## Usage

``` js
const setupDatabase = require('mod-db')

setupDabase(config).then(db => {
  const { Agent, Metric } = db

}).catch(err => console.error(err))
```
