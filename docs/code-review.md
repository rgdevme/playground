## Code Standards
	- Code reviews

### Quality model ISO 25011
- clean
- short
- clear
- testable
- maintainable
  - code smells
  - dead code
  - hidden bugs
  - technical debt

### Code reviews
**Requierements**
- Clear description
- Passing tests
- Comfortable size
- Time: about 3s per LoC. Ex: 600 lines would take about 30 minutes. 

**STEPS**
1. Read the code and make your comments in a draft.
  1. Use the description as a starting point.
  2. Write comments with good communication standards: . 
2. Read it again and update your comments.
  1. Change the file review order to ensure you're not missing anything.
  2. Write comments with good communication standards.
3. Read it again and make a sumary.
4. Aprove or reject.

**To write a good comment:**
- Give context
- Use markdown
- Provide sources
- Suggest changes in a polite and assertive manner:
  - condition inversion: collapse nesting
	- merge and group by concern
	- extract logic: avoids duplication and improves readability and maintainability.
	- naming: adhering to a naming convention eases readability and maintainability.


### Code quality metrics
#### Qualitative
| Dimension       | Description                                                                                   | Indicators                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Maintainability | Quantifies the development experience, readability, and code design                           | Code review: <br> - Naming convention <br> - Readability <br> - Simplicity <br> - Documentation <br> - Standards |
| Documentation   | Assess how many of the code blocks require explicit explanation and how many of these have it | - .md files, wiki, etc... <br> - JSDocs comments                                                                 |
| Security        | Asseses how secure by default is a code block                                                 | - Policy of least access                                                                                         |



1. Check cleanlyness
2. Check correctness
3. Check style
4. Check business practices
- Comply with quality

#### Quantitative
| Dimension             | Description                                                                                                                                                                         | Indicators                                                                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test coverage         | Measures the percentage of code executed during tests                                                                                                                               | Passed tests                                                                                                                                                                                                |
| Doc coverage          | Measures the percentage of code that have documentation.                                                                                                                            | Comments                                                                                                                                                                                                    |
| Reliability           | Measures how well software performs its intended functions consistently and without failure over a specific period                                                                  | Runtime errors reports between updates                                                                                                                                                                      |
| Cyclomatic complexity | Indicates complexity and potential defects by counting the number of independent paths the code can execute.                                                                        | = E - N + 2P$$ <br> *10 >= warn ; 20 >= error* <br><br> - E: Edges <br> - N: Nodes <br> - P: comnnected components <br><br>                                                                                 |
| Halstead complexity   | Estimatees program difficulty and maintenance effort, analizing operators and operands: <br> - operators: =, if, (), ?, =, else, print, fn <br> - operands: variables and literants | = N1 + N2 * log2(n1+n2) <br><br> - N1: total number of operators <br> - Total number of operands <br> - distinct number of operators <br> - distinct number of operands                                     |
| Lines of code         | Lines of code relevant to the functionality                                                                                                                                         | 50 >= warn ; 100 >= error <br>*Comments may be ignored*                                                                                                                                                     |
| Maintainability index | Meassures the relative ease of maintaining the code for a new dev                                                                                                                   | Weighted relation between: <br> - Halstead volume <br> - Cyclomatic complexity <br> - Lines of code <br><br> = [171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LoC)] * (100/171) <br> 10 < error ; 20 < warning |
| Code Churn            | Indicates inestability by tracking code changes over time.                                                                                                                          | Git reports or specialized tooling                                                                                                                                                                          |
| Defect density        | Quantifies the health of the code by dividing the total number of confirmed defects (bugs) by the size of the codebase (meassured per thousands of lines).                          | 1 <= Excellent ; 5 <= Good ; 10 <= Average ; 10 > Unstable                                                                                                                                                  |
| Arguments             | 4 >= warn ; 8 >= error                                                                                                                                                              |                                                                                                                                                                                                             |
| Methods               | 10 >= warn ; 20 >= error                                                                                                                                                            |                                                                                                                                                                                                             |
| Max. Nesting levels   | 5 >= warn ; 10 >= error                                                                                                                                                             |                                                                                                                                                                                                             |



#### Tools
- Linting: ESLint
- Metric collection: typhonjs-escomplex
- Automated testing: Jest, Playwright
- Documentation: Storybook

- how to discern good code from bad code?
- don't be shy to complain
- don't be shy to be strict
- align the goals and focus on delivery
- make the client feel our team is part of theirs
- take responsibility for the results
- it's about solving the clients issues