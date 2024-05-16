# The program for automating the execution of commands in the terminal

---

## Description

During work, there are often recurring tasks that require automation.
Personally, I find it inconvenient to constantly refer to documentation to remind myself of the arguments for various commands.

Regarding the terminal, it could be any terminal (since the program will be cross-platform).

Let's say it's running a program (the program will be written in Node.js) in the zsh shell:
`node index.js`

Then, options appear:
_"What command do you want to execute"_

- ffmpeg
- ansible
- man

Choose **ffmpeg**
Now, questions arise about this command, for example:

- width: <enter here>
- height: <enter here>
- inputName: <enter here>
- outputName: <enter here>

After input, a string is formed: ffmpeg -i `inputName` -s `width`x`height` `outputName`
Then, a child process is launched, which will also be executed in zsh.
And the result is displayed.

A configuration file wouldn't be suitable since each command may have its own separate logic that needs to be described.
Also, the implementation of this program **will not be** straightforward (indeed, the most naive implementation will probably be around 50 lines of code).
Therefore, for future scalability, architectural patterns will be used.

A logger service, prompt service (for data input), file service, builder, and executor will be implemented for each command.
