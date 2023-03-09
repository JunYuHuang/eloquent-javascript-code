# Pausing the Game

Make it possible to pause (suspend) and unpause the game by pressing the
`ESC` key.

This can be done by changing the `runLevel` function to use another keyboard event handler and interrupting or resuming the animation whenever
the `ESC` key is pressed.

The `runAnimation` interface may not look like it is suitable for this at first
glance, but it is if you rearrange the way `runLevel` calls it.

When you have that working, there is something else you could try. The
way we have been registering keyboard event handlers is somewhat problematic. The `arrows` object is currently a global binding, and its event handlers
are kept around even when no game is running. You could say they _leak_ out
of our system. Extend `trackKeys` to provide a way to unregister its handlers
and then change `runLevel` to register its handlers when it starts and unregister them again when it is finished.

## Exercise Hints

An animation can be interrupted by returning `false` from the function given
to `runAnimation`. It can be continued by calling `runAnimation` again.

So we need to communicate the fact that we are pausing the game to the
function given to `runAnimation`. For that, you can use a binding that both the
event handler and that function have access to.

When unregistering the handlers registered by `trackKeys`, remember
that the _exact_ same function value that was passed to `addEventListener` must
be passed to `removeEventListener` to successfully remove a handler. Thus, the
`handler` function value created in `trackKeys` must be available to the code that
unregisters the handlers.

You can add a property to the object returned by `trackKeys`, containing either that function value or a method that handles the unregistering
directly.