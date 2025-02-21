Hooks.on('preRollAttack', (roll, actor, token) => {
  const targetToken = token; // Token que está sendo atacado
  const attackRoll = roll.total; // Resultado do ataque rolado

  // Verificar se o jogador tem acesso aos dados do ator
  const canSeeAC = targetToken.actor.testUserPermission(game.user, "OWNER") || 
                   targetToken.actor.testUserPermission(game.user, "OBSERVER");

  // Acessar a CA do alvo se o jogador tiver permissão
  let targetAC;
  if (canSeeAC) {
    targetAC = targetToken.actor.data.data.attributes.ac.value; // CA do alvo na ficha do ator
  } else {
    targetAC = null; // Não mostra a CA
  }

  // Somar bônus de ataque se necessário
  const attackBonus = roll.data.bonus || 0; // Ajuste conforme necessário
  const totalAttack = attackRoll + attackBonus;

  if (totalAttack >= (targetAC || 0)) {
    ui.notifications.info("O ataque acerta!");
  } else {
    ui.notifications.info("O ataque erra!");
  }

  // Se o jogador não tiver acesso à CA, não exiba o valor
  if (!canSeeAC) {
    ui.notifications.info("O ataque acertou ou errou, mas o valor da defesa não pode ser revelado.");
  }
});
