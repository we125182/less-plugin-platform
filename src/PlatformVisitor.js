const equalFlagMap = {
  ifdef(current, target) {
    return current === target;
  },
  ifndef(current, target) {
    return current !== target
  }
}

class PlatformVisitor {
  constructor(less, options) {
    this._visitor = new less.visitors.Visitor(this)
    this.platform = options.platform
    this.removeNextNode = false
    this.reg = options.reg
  }

  run(root) {
    return this._visitor.visit(root);
  }

  visitComment(commentNode) {
    const { value } = commentNode
    const [, equalFlag, targetPlatform] = value.match(this.reg) || []
    if (targetPlatform) {
      this.removeNextNode = !equalFlagMap[equalFlag](this.platform, targetPlatform)
      return []
    } else if (equalFlag === 'endif') {
      this.removeNextNode = false
      return []
    }
    return commentNode
  }

  visitDeclaration(DeclarationNode) {
    if (this.removeNextNode) {
      return []
    }
    return DeclarationNode
  }

  visitRuleset(rulesetNode) {
    if (this.removeNextNode) {
      return []
    }
    return rulesetNode
  }

  get isReplacing() {
    return true;
  }
  get isPreEvalVisitor() {
    return true;
  }
}

module.exports = PlatformVisitor;