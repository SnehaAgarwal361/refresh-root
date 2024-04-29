# Contributing 

The following guidelines are for the contributors to this repository.

### Pull Request Guidelines

* All pull requests must have a description and the link to their respective Jira ticket(s).

* Review and test your code locally and ensure that the regression test is passing before raising a PR.

### Branching Strategy

We follow the [MAESTRO Branching Stratergy](https://enterprise-confluence.aexp.com/confluence/display/MAES/2.+Branching+and+Tagging+Strategy) for all commits and pull requests.

Branches should use the following naming convention with MAES-XXXX being the Jira ticket number:

```feature/MAES-XXXX-{short-description}``` to add new features to the project.

or 

```bugfix/MAES-XXXX-{short-description}``` to address a bug in a release branch or address a minor/low priority bug.

or

``` hotfix/{MAES-XXXX}-{short-description}``` to patch a production (E3) bug/vulnerability. Here MAES-XXXX is the bug in jira.

### Git Commit Guidelines

Add your Commit message in the format ```MAES-XXXX {my commit message}``` or ```[MAES-XXXX] {my commit message}```.

### Label

Use relevant [Semantic Versioning Label](https://semver.org/) (patch, minor, major) when raising the PR. The Label will be used to determine what the next version of the application or library will be.

For example:

1. ```change: MAJOR``` label when you make incompatible API changes.
2. ```change: MINOR``` label when you add functionality in a backward compatible manner.
3. ```change: PATCH``` label when you make backward compatible bug fixes.
