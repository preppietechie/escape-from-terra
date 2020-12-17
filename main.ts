namespace SpriteKind {
    export const astroid = SpriteKind.create()
}
namespace StatusBarKind {
    export const AstroidHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.astroid, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 200)
    scene.cameraShake(4, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . 5 4 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Ship, 0, -200)
    projectile.ay = 150
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.astroid, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(100)
    otherSprite.destroy(effects.ashes, 200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(100)
    otherSprite.destroy(effects.ashes, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 200)
    scene.cameraShake(4, 500)
})
let baddies1: Sprite = null
let anim = 0
let astroid: Sprite = null
let projectile: Sprite = null
let Ship: Sprite = null
effects.starField.startScreenEffect()
Ship = sprites.create(img`
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . 7 1 1 8 1 1 7 . . . . . 
    . . . . 1 1 8 9 8 1 1 . . . . . 
    . . . . 1 8 9 8 9 8 1 . . . . . 
    . . . 1 1 1 1 1 1 1 1 1 . . . . 
    . . . 1 1 1 1 f 1 1 1 1 . . . . 
    . . 1 1 f 1 1 f 1 1 f 1 1 . . . 
    1 1 1 1 f 1 1 f 1 1 f 1 1 1 1 . 
    . 1 1 1 2 1 1 f 1 1 2 1 1 1 . . 
    . . 1 1 4 1 1 2 1 1 4 1 1 . . . 
    . . . . . 1 1 4 1 1 . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Ship, 150, 150)
Ship.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
info.setScore(0)
game.onUpdateInterval(5000, function () {
    astroid = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.astroid)
    anim = 0
    astroid.x = randint(10, scene.screenWidth() - 10)
    astroid.y = 0
    astroid.vy = 10
    animation.runImageAnimation(
    astroid,
    [img`
        . . . . . . . c c c a c . . . . 
        . . c c b b b a c a a a c . . . 
        . c c a b a c b a a a b c c . . 
        . c a b c f f f b a b b b a . . 
        . c a c f f f 8 a b b b b b a . 
        . c a 8 f f 8 c a b b b b b a . 
        c c c a c c c c a b c f a b c c 
        c c a a a c c c a c f f c b b a 
        c c a b 6 a c c a f f c c b b a 
        c a b c 8 6 c c a a a b b c b c 
        c a c f f a c c a f a c c c b . 
        c a 8 f c c b a f f c b c c c . 
        . c b c c c c b f c a b b a c . 
        . . a b b b b b b b b b b b c . 
        . . . c c c c b b b b b c c . . 
        . . . . . . . . c b b c . . . . 
        `,img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `,img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `],
    500,
    true
    )
})
game.onUpdateInterval(2000, function () {
    baddies1 = sprites.create(img`
        . . . . . . 4 . . . 4 . . . . . 
        . . . . 7 2 4 2 7 2 4 2 7 . . . 
        . . . 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 8 7 7 7 8 7 7 7 7 . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . . . 7 7 7 8 7 7 7 8 7 7 7 . . 
        . . . . 7 7 7 7 7 7 7 7 7 . . . 
        . . . . 7 7 8 7 7 7 8 7 7 . . . 
        . . . . 7 . 8 9 8 9 8 . 7 . . . 
        . . . . 2 . 7 8 9 8 7 . 2 . . . 
        . . . . . . 7 7 8 7 7 . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . 7 5 7 . . . . . . 
        . . . . . . . 7 5 7 . . . . . . 
        . . . . . . . . 7 . . . . . . . 
        `, SpriteKind.Enemy)
    baddies1.x = randint(10, scene.screenWidth() - 10)
    baddies1.y = 0
    baddies1.vy = 30
})
