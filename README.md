![header](/_assets/header.png)

Reanimate dead projects faster than you can say 'Lazarus of Bethany'!

## Overview

So you spent your precious time away from the operating table on archiving older projects, only to have someone reach out for you to revive one of them days later? What a nuisance!

But fret not! Because reanimating old links is now easier than ever!

#### Here is how it works:

You'll only have to tell `reanimator.js` what project you want roaming the earth again, and it does everything else for you!

#### The dualism of the reanimator

There are two modes in reanimator: `file` and `auto`.

**File mode:** If you select a specific file, it will be used as the basis for the live link.

**Auto mode:** If you select a folder, the reanimator automatically selects the project's latest version instead.

#### Consistent chronology

Reanimator tries to find a date in the filename. It will use that when naming the target folder and extract the project. If no date can be found, today's date will be used instead.

#### Metamorphosis

To provide the best experience to your clients and colleagues, `reanimator.js` will also turn off SCORM and others in the project and any restrictions on the controls of videos!

## Prerequisites

To use `reanimator.js`, you'll have to have SSH keys for the servers, and you'll have to be able to connect to them on the command line without having to enter a password. If `BigGulp™` works for you, `reanimator.js` will too.

## Installation

Install the CLI globally by running

```bash
npm install -g @das.laboratory/reanimator
```

## Usage

#### Running reanimator.js

You can use the built-in navigator to select the server and the folder or file:

```bash
reanimator
```

![header](/_assets/navigator.png)

While this is very convenient, you will be a lot quicker when you provide a path on the command line:

```bash
# to a folder (auto mode)...
reanimator galvanism-for-noobs/en

# or to a file (file mode)...
reanimator galvanism-for-noobs/en/das.laboratory-galvanism.for.noobs-en-20210906-web.zip
```

Or use the full URL to the project, so you don't even have to select the server:

```bash
# to a folder (auto mode)...
reanimator https://daslaboratory.com/galvanism-for-noobs/en

# or to a file (file mode)...
reanimator https://daslaboratory.com/galvanism-for-noobs/en/das.laboratory-galvanism.for.noobs-en-20210906-web.zip
```

**Note:** If you provide a URL to a folder, its parent folder will be used instead. Because when you use the old live link, the folder will obviously not be available anymore. Otherwise, there would be little reason to use `reanimator.js` at all.

#### Finishing up

In any case, you will end up with a summary, and the reanimated live link will also be copied to your clipboard!

![header](/_assets/finished.png)

**Dedicated to the memory of [Herbert West](https://en.wikipedia.org/wiki/Herbert_West%E2%80%93Reanimator).**
Scholar, visionary and misunderstood genius.
