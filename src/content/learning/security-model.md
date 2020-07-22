# Security Model

Since the very start of the Workers project, security has been a high priority  — we were concerned early on that when hosting a large number of tenants on shared infrastructure, side channels of various kinds would pose a threat. The Cloudflare Workers runtime is carefully designed to defend against side channel attacks.

To this end, Workers is designed to make it impossible for code to measure its own execution time locally. For example, the value returned by Date.now() is locked in place while code is executing. No other timers are provided. Moreover, we provide no access to concurrency (e.g. multi-threading), as it could allow attackers to construct ad hoc timers. These design choices cannot be introduced retroactively into other platforms - such as web browsers - because they remove APIs that existing applications depend on. They were possible in Workers only because we made these choices from the start.

While these early design decisions have proven effective, we are continuing to add defense-in-depth, including techniques to disrupt attacks by rescheduling workers, creating additional layers of isolation between suspicious workers and high-value workers, and more.

Our approach is very different from the approach taken by most of the industry. It is resistant to the entire range of [Spectre-style attacks](https://www.cloudflare.com/learning/security/threats/meltdown-spectre/), without requring special attention paid to each one and without needing to block speculation in general. However, because our approach is different, we know it requires careful study. We are currently working with researchers at Graz University of Technology (TU Graz) to study what we've done. These researchers include some of the people who originally discovered Spectre. We will publish the results of this research as they becomes available.

For more details, please refer to [this talk](https://www.infoq.com/presentations/cloudflare-v8) by Kenton Varda, architect of Cloudflare Workers. Spectre is covered near the end.
