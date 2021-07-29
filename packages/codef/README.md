# CODEF

code define, define your code!

## Usage

### define Plugin

```javascript
import { definePlugin } from "codef"

const plugin = definePlugin(({ register }, options) => {
  registerCmd("create", {
    description: "create a project",
    alias: "c"
  }, () => {
    // command action
  })
})

export default plugin
```

### codef.config.js

```typescript

import { defineConfig } from "codef"

// ts
export default defineConfig({
  plugins: [
    codefPluginCreate(options),
    codefPluginVue(options),
  ]
})

```
